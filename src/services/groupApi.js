import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { buildQueryParams } from '../utils/queryParams';

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_BASE_URL
    ? `${import.meta.env.VITE_BACKEND_BASE_URL}/api`
    : "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Group', 'GroupHierarchy', 'GroupPermissions', 'AvailableParents'],
  endpoints: (builder) => ({
    getGroupHierarchy: builder.query({
      query: () => ({
        url: '/groups/hierarchy',
        method: 'GET',
      }),
      providesTags: ['GroupHierarchy'],
      transformResponse: (response) => response.data || [],
    }),

    getGroups: builder.query({
      query: ({ page = 1, limit = 10, search = '', filters = {} } = {}) => ({
        url: `/groups?${buildQueryParams({ page, limit, search, filters })}`,
        method: 'GET',
      }),
      providesTags: ['Group'],
      transformResponse: (response) => response.data || [],
    }),

    getGroupsByType: builder.query({
      query: (groupType) => ({
        url: `/groups/type/${groupType}`,
        method: 'GET',
      }),
      providesTags: ['Group'],
      transformResponse: (response) => response.data || [],
    }),

    getGroupsByParent: builder.query({
      query: (parentId) => ({
        url: `/groups/parent/${parentId || 'null'}`,
        method: 'GET',
      }),
      providesTags: ['Group'],
      transformResponse: (response) => response.data || [],
    }),

    getAvailableParents: builder.query({
      query: () => ({
        url: '/groups/available-parents',
        method: 'GET',
      }),
      providesTags: ['AvailableParents'],
      transformResponse: (response) => response.data || [],
    }),

    getGroupById: builder.query({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Group', id }],
      transformResponse: (response) => response.data,
    }),

    createGroup: builder.mutation({
      query: (groupData) => ({
        url: '/groups',
        method: 'POST',
        body: groupData,
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    updateGroup: builder.mutation({
      query: ({ id, ...groupData }) => ({
        url: `/groups/${id}`,
        method: 'PUT',
        body: groupData,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Group', 
        'GroupHierarchy', 
        'AvailableParents',
        { type: 'Group', id }
      ],
    }),

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    getGroupPermissions: builder.query({
      query: (groupId) => ({
        url: `/groups/${groupId}/permissions`,
        method: 'GET',
      }),
      providesTags: (result, error, groupId) => [{ type: 'GroupPermissions', id: groupId }],
      transformResponse: (response) => response.data || [],
    }),

    setGroupPermission: builder.mutation({
      query: ({ groupId, userId, permissions }) => ({
        url: `/groups/${groupId}/permissions/${userId}`,
        method: 'POST',
        body: permissions,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: 'GroupPermissions', id: groupId }
      ],
    }),

    getGroupLedgers: builder.query({
      query: (groupId) => ({
        url: `/groups/${groupId}/ledgers`,
        method: 'GET',
      }),
      providesTags: (result, error, groupId) => [{ type: 'GroupLedgers', id: groupId }],
      transformResponse: (response) => response.data || [],
    }),

    createGroupLedger: builder.mutation({
      query: ({ groupId, ledgerData }) => ({
        url: `/groups/${groupId}/ledgers`,
        method: 'POST',
        body: ledgerData,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: 'GroupLedgers', id: groupId }
      ],
    }),

    updateGroupLedger: builder.mutation({
      query: ({ groupId, ledgerId, ledgerData }) => ({
        url: `/groups/${groupId}/ledgers/${ledgerId}`,
        method: 'PUT',
        body: ledgerData,
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: 'GroupLedgers', id: groupId }
      ],
    }),

    deleteGroupLedger: builder.mutation({
      query: ({ groupId, ledgerId }) => ({
        url: `/groups/${groupId}/ledgers/${ledgerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: 'GroupLedgers', id: groupId }
      ],
    }),

    bulkCreateGroups: builder.mutation({
      query: (groupsData) => ({
        url: '/groups/bulk',
        method: 'POST',
        body: groupsData,
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    searchGroups: builder.query({
      query: ({ search, groupType, isDefault, parentGroupId } = {}) => ({
        url: `/groups/search?${buildQueryParams({ search, groupType, isDefault, parentGroupId })}`,
        method: 'GET',
      }),
      providesTags: ['Group'],
      transformResponse: (response) => response.data || [],
    }),

    getGroupStats: builder.query({
      query: () => ({
        url: '/groups/stats',
        method: 'GET',
      }),
      providesTags: ['GroupStats'],
      transformResponse: (response) => response.data || {},
    }),

    exportGroups: builder.mutation({
      query: ({ format = 'json', filters = {} } = {}) => ({
        url: `/groups/export?${buildQueryParams({ format, ...filters })}`,
        method: 'GET',
        responseHandler: async (response) => {
          const blob = await response.blob();
          return { data: blob, type: response.headers.get('content-type') };
        },
      }),
    }),

    importGroups: builder.mutation({
      query: (importData) => ({
        url: '/groups/import',
        method: 'POST',
        body: importData,
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    moveGroup: builder.mutation({
      query: ({ groupId, newParentId }) => ({
        url: `/groups/${groupId}/move`,
        method: 'PUT',
        body: { newParentId },
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    duplicateGroup: builder.mutation({
      query: ({ groupId, newName, newParentId }) => ({
        url: `/groups/${groupId}/duplicate`,
        method: 'POST',
        body: { newName, newParentId },
      }),
      invalidatesTags: ['Group', 'GroupHierarchy', 'AvailableParents'],
    }),

    getPermissionTemplates: builder.query({
      query: () => ({
        url: '/groups/permission-templates',
        method: 'GET',
      }),
      providesTags: ['PermissionTemplates'],
      transformResponse: (response) => response.data || [],
    }),

    applyPermissionTemplate: builder.mutation({
      query: ({ groupId, templateId }) => ({
        url: `/groups/${groupId}/apply-template/${templateId}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { groupId }) => [
        { type: 'GroupPermissions', id: groupId }
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGroupHierarchyQuery,
  useGetGroupsQuery,
  useGetGroupsByTypeQuery,
  useGetGroupsByParentQuery,
  useGetAvailableParentsQuery,
  useGetGroupByIdQuery,
  useSearchGroupsQuery,
  useGetGroupStatsQuery,
  useGetPermissionTemplatesQuery,

  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useBulkCreateGroupsMutation,
  useExportGroupsMutation,
  useImportGroupsMutation,
  useMoveGroupMutation,
  useDuplicateGroupMutation,

  useGetGroupPermissionsQuery,
  useSetGroupPermissionMutation,
  useApplyPermissionTemplateMutation,

  useGetGroupLedgersQuery,
  useCreateGroupLedgerMutation,
  useUpdateGroupLedgerMutation,
  useDeleteGroupLedgerMutation,
} = groupApi; 