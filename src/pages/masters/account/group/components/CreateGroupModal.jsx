import React from 'react';
import Modal from '../../../../../componets/common/Modal';
import Button from '../../../../../componets/common/Button';
import Input from '../../../../../componets/common/Input';
import Select from '../../../../../componets/common/Select';

const CreateGroupModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onFormChange, 
  onSubmit, 
  availableParents, 
  parentsLoading, 
  creatingGroup 
}) => {
  const groupTypes = [
    { value: 'Asset', label: 'Asset' },
    { value: 'Liability', label: 'Liability' },
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
    { value: 'Capital', label: 'Capital' }
  ];

  const handleParentChange = (e) => {
    const parentId = e.target.value || null;
    const parent = availableParents.find(p => p.id == parentId);
    onFormChange({
      ...formData,
      parentGroupId: parentId,
      parentGroupName: parent ? parent.groupName : '',
      undergroup: parent ? parent.groupName : formData.groupName
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Create New Group"
      className="max-w-2xl"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.groupName || ''}
              onChange={(e) => onFormChange({ ...formData, groupName: e.target.value })}
              placeholder="Enter group name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Group
            </label>
            <Select
              value={formData.parentGroupId || ''}
              onChange={handleParentChange}
              disabled={parentsLoading}
            >
              <option value="">No Parent (Top Level)</option>
              {availableParents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.groupName} ({parent.groupType})
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Type <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.groupType || ''}
              onChange={(e) => onFormChange({ ...formData, groupType: e.target.value })}
              required
            >
              <option value="">Select Group Type</option>
              {groupTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Under Group
            </label>
            <Input
              value={formData.undergroup || ''}
              onChange={(e) => onFormChange({ ...formData, undergroup: e.target.value })}
              placeholder="Parent group name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter group description"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={creatingGroup}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!formData.groupName || !formData.groupType || creatingGroup}
            loading={creatingGroup}
          >
            Create Group
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateGroupModal; 