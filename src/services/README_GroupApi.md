# RTK Query Group API Service Documentation

## Overview

The `groupApi` service provides a comprehensive set of RTK Query endpoints for managing hierarchical accounting groups with permission-based access control. This service follows the same pattern as other API services in the application and integrates seamlessly with the Redux store.

## Features

- ✅ **Hierarchical Group Management** - Unlimited nesting levels
- ✅ **Permission-Based Access Control** - Granular permissions per user/group
- ✅ **Automatic Permission Inheritance** - Sub-groups inherit parent permissions
- ✅ **Real-time Cache Management** - Automatic cache invalidation
- ✅ **Optimistic Updates** - Immediate UI updates
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Loading States** - Built-in loading indicators
- ✅ **TypeScript Ready** - Full type safety support

## Installation & Setup

### 1. Import the API Service

```javascript
import { groupApi } from '../services/groupApi';
```

### 2. Add to Redux Store

```javascript
// store.js
import { groupApi } from './services/groupApi';

export const store = configureStore({
  reducer: {
    [groupApi.reducerPath]: groupApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      groupApi.middleware,
      // ... other middleware
    ),
});
```

## Available Hooks

### Query Hooks (Read Operations)

#### 1. `useGetGroupHierarchyQuery()`
Get complete group hierarchy with nested structure.

```javascript
const { 
  data: hierarchy = [], 
  isLoading, 
  error, 
  refetch 
} = useGetGroupHierarchyQuery();

// Returns: Array of groups with nested children
// [
//   {
//     id: 1,
//     groupName: "Assets",
//     groupType: "Asset",
//     children: [
//       {
//         id: 2,
//         groupName: "Current Assets",
//         groupType: "Asset",
//         children: []
//       }
//     ]
//   }
// ]
```

#### 2. `useGetGroupsQuery(options)`
Get paginated list of groups with filters.

```javascript
const { 
  data: groups = [], 
  isLoading 
} = useGetGroupsQuery({
  page: 1,
  limit: 10,
  search: 'asset',
  filters: { groupType: 'Asset' }
});
```

#### 3. `useGetGroupsByTypeQuery(groupType)`
Get groups filtered by type.

```javascript
const { data: assetGroups = [] } = useGetGroupsByTypeQuery('Asset');
```

#### 4. `useGetGroupsByParentQuery(parentId)`
Get groups under a specific parent.

```javascript
const { data: childGroups = [] } = useGetGroupsByParentQuery(1);
// Pass null for top-level groups
const { data: topLevelGroups = [] } = useGetGroupsByParentQuery(null);
```

#### 5. `useGetAvailableParentsQuery()`
Get groups that can be used as parents for new groups.

```javascript
const { data: availableParents = [] } = useGetAvailableParentsQuery();
```

#### 6. `useGetGroupByIdQuery(id)`
Get specific group by ID.

```javascript
const { 
  data: group, 
  isLoading 
} = useGetGroupByIdQuery(1, {
  skip: !id // Skip if no ID provided
});
```

#### 7. `useSearchGroupsQuery(searchOptions)`
Search groups with advanced filters.

```javascript
const { data: searchResults = [] } = useSearchGroupsQuery({
  search: 'cash',
  groupType: 'Asset',
  isDefault: false,
  parentGroupId: 1
});
```

#### 8. `useGetGroupStatsQuery()`
Get group statistics.

```javascript
const { data: stats = {} } = useGetGroupStatsQuery();
// Returns: { totalGroups: 10, assetGroups: 5, liabilityGroups: 3, ... }
```

#### 9. `useGetGroupPermissionsQuery(groupId)`
Get permissions for a specific group.

```javascript
const { 
  data: permissions = [], 
  isLoading 
} = useGetGroupPermissionsQuery(groupId, {
  skip: !groupId
});
```

#### 10. `useGetGroupLedgersQuery(groupId)`
Get ledgers under a specific group.

```javascript
const { data: ledgers = [] } = useGetGroupLedgersQuery(groupId, {
  skip: !groupId
});
```

### Mutation Hooks (Write Operations)

#### 1. `useCreateGroupMutation()`
Create a new group.

```javascript
const [createGroup, { isLoading, error }] = useCreateGroupMutation();

const handleCreate = async () => {
  try {
    const result = await createGroup({
      groupName: 'New Group',
      groupType: 'Asset',
      description: 'Description',
      parentGroupId: 1,
      parentGroupName: 'Parent Group'
    }).unwrap();
    
    console.log('Created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 2. `useUpdateGroupMutation()`
Update an existing group.

```javascript
const [updateGroup, { isLoading }] = useUpdateGroupMutation();

const handleUpdate = async () => {
  try {
    const result = await updateGroup({
      id: 1,
      groupName: 'Updated Name',
      description: 'Updated description'
    }).unwrap();
    
    console.log('Updated:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 3. `useDeleteGroupMutation()`
Delete a group.

```javascript
const [deleteGroup, { isLoading }] = useDeleteGroupMutation();

const handleDelete = async (groupId) => {
  try {
    await deleteGroup(groupId).unwrap();
    console.log('Deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 4. `useBulkCreateGroupsMutation()`
Create multiple groups at once.

```javascript
const [bulkCreateGroups, { isLoading }] = useBulkCreateGroupsMutation();

const handleBulkCreate = async () => {
  try {
    const result = await bulkCreateGroups([
      { groupName: 'Group 1', groupType: 'Asset' },
      { groupName: 'Group 2', groupType: 'Liability' }
    ]).unwrap();
    
    console.log('Bulk created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 5. `useExportGroupsMutation()`
Export groups to various formats.

```javascript
const [exportGroups, { isLoading }] = useExportGroupsMutation();

const handleExport = async () => {
  try {
    const result = await exportGroups({ 
      format: 'json',
      filters: { groupType: 'Asset' }
    }).unwrap();
    
    // Handle file download
    const blob = new Blob([JSON.stringify(result.data)], { 
      type: 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'groups-export.json';
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 6. `useImportGroupsMutation()`
Import groups from file.

```javascript
const [importGroups, { isLoading }] = useImportGroupsMutation();

const handleImport = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const result = await importGroups(formData).unwrap();
    console.log('Imported:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 7. `useMoveGroupMutation()`
Move a group to a different parent.

```javascript
const [moveGroup, { isLoading }] = useMoveGroupMutation();

const handleMove = async (groupId, newParentId) => {
  try {
    const result = await moveGroup({ 
      groupId, 
      newParentId 
    }).unwrap();
    
    console.log('Moved:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 8. `useDuplicateGroupMutation()`
Duplicate a group with all its settings.

```javascript
const [duplicateGroup, { isLoading }] = useDuplicateGroupMutation();

const handleDuplicate = async (groupId, newName, newParentId) => {
  try {
    const result = await duplicateGroup({
      groupId,
      newName,
      newParentId
    }).unwrap();
    
    console.log('Duplicated:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 9. `useSetGroupPermissionMutation()`
Set permissions for a user on a specific group.

```javascript
const [setGroupPermission, { isLoading }] = useSetGroupPermissionMutation();

const handleSetPermission = async (groupId, userId, permissions) => {
  try {
    const result = await setGroupPermission({
      groupId,
      userId,
      permissions: {
        canCreateLedger: true,
        canEditLedger: true,
        canDeleteLedger: false,
        canViewLedger: true,
        canCreateTransaction: true,
        canEditTransaction: true,
        canDeleteTransaction: false,
        canViewTransaction: true,
        canViewReport: true,
        canExportReport: false,
        canViewBalance: true,
        canModifyBalance: false,
        canCreateSubGroup: true,
        canEditGroup: true,
        canDeleteGroup: false,
        canSetOpeningBalance: false
      }
    }).unwrap();
    
    console.log('Permissions set:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### 10. `useCreateGroupLedgerMutation()`
Create a ledger under a specific group.

```javascript
const [createGroupLedger, { isLoading }] = useCreateGroupLedgerMutation();

const handleCreateLedger = async (groupId, ledgerData) => {
  try {
    const result = await createGroupLedger({
      groupId,
      ledgerData: {
        ledgerName: 'Cash Account',
        openingBalance: 1000.00,
        balanceType: 'Debit',
        description: 'Main cash account'
      }
    }).unwrap();
    
    console.log('Ledger created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Error Handling

All hooks provide error information:

```javascript
const { 
  data, 
  isLoading, 
  error, 
  isError 
} = useGetGroupHierarchyQuery();

if (isError) {
  console.error('Error:', error);
  // Handle error (show toast, redirect, etc.)
}
```

## Loading States

All hooks provide loading states:

```javascript
const { isLoading } = useGetGroupHierarchyQuery();
const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();

// Use in UI
{isLoading && <Loader />}
{isCreating && <span>Creating...</span>}
```

## Cache Management

RTK Query automatically manages cache invalidation:

```javascript
// When you create a group, these caches are automatically invalidated:
// - Group
// - GroupHierarchy  
// - AvailableParents

// When you update a group, these are invalidated:
// - Group
// - GroupHierarchy
// - AvailableParents
// - Specific group by ID
```

## Optimistic Updates

For better UX, you can implement optimistic updates:

```javascript
const [updateGroup] = useUpdateGroupMutation();

const handleOptimisticUpdate = async () => {
  const patchResult = dispatch(
    groupApi.util.updateQueryData('getGroupById', 1, (draft) => {
      draft.groupName = 'Optimistic Update';
    })
  );
  
  try {
    await updateGroup({ id: 1, groupName: 'Optimistic Update' }).unwrap();
  } catch {
    // Revert on error
    patchResult.undo();
  }
};
```

## Complete Example Component

```javascript
import React, { useState } from 'react';
import {
  useGetGroupHierarchyQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} from '../services/groupApi';

const GroupManager = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  // Queries
  const { 
    data: groups = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetGroupHierarchyQuery();
  
  // Mutations
  const [createGroup, { isLoading: creating }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: updating }] = useUpdateGroupMutation();
  const [deleteGroup, { isLoading: deleting }] = useDeleteGroupMutation();
  
  const handleCreate = async (groupData) => {
    try {
      await createGroup(groupData).unwrap();
      // Success - cache is automatically updated
    } catch (error) {
      // Handle error
    }
  };
  
  const handleUpdate = async (id, updates) => {
    try {
      await updateGroup({ id, ...updates }).unwrap();
      // Success - cache is automatically updated
    } catch (error) {
      // Handle error
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteGroup(id).unwrap();
      // Success - cache is automatically updated
    } catch (error) {
      // Handle error
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {/* Your UI components */}
    </div>
  );
};
```

## Best Practices

1. **Use `skip` option** for conditional queries
2. **Handle loading and error states** in your UI
3. **Use `unwrap()`** for mutations to get proper error handling
4. **Leverage cache invalidation** for automatic updates
5. **Implement optimistic updates** for better UX
6. **Use TypeScript** for better type safety

## API Endpoints

The service connects to these backend endpoints:

- `GET /api/groups/hierarchy` - Get group hierarchy
- `GET /api/groups` - Get groups with pagination
- `GET /api/groups/type/:type` - Get groups by type
- `GET /api/groups/parent/:parentId` - Get groups by parent
- `GET /api/groups/available-parents` - Get available parents
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group
- `GET /api/groups/:groupId/permissions` - Get group permissions
- `POST /api/groups/:groupId/permissions/:userId` - Set permissions
- And many more...

## Troubleshooting

### Common Issues

1. **Cache not updating**: Check if the mutation invalidates the correct tags
2. **Loading states not working**: Ensure you're using the correct loading property
3. **Errors not caught**: Use `unwrap()` for mutations and check `isError` for queries
4. **Network errors**: Check the base URL and authentication headers

### Debug Tips

```javascript
// Enable RTK Query dev tools
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    // Add logging
    prepareHeaders: (headers, { getState }) => {
      console.log('Request headers:', headers);
      return headers;
    },
  }),
  // ... rest of config
});
```

This RTK Query service provides a robust, type-safe, and efficient way to manage hierarchical accounting groups with full CRUD operations, permission management, and real-time cache updates. 