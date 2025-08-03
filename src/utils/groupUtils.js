export const flattenGroups = (groups, level = 0) => {
  let flatGroups = [];
  
  groups.forEach(group => {
    const indent = "  ".repeat(level);
    flatGroups.push({
      ...group,
      groupName: `${indent}${group.groupName}`,
      originalGroupName: group.groupName,
      level: level
    });
    
    if (group.children && group.children.length > 0) {
      flatGroups = [...flatGroups, ...flattenGroups(group.children, level + 1)];
    }
  });
  
  return flatGroups;
};

export const getOriginalGroupName = (group) => {
  return group.originalGroupName || group.groupName.replace(/^\s+/, '');
};

export const formatGroupName = (group, level = 0) => {
  const indent = "  ".repeat(level);
  return `${indent}${group.groupName}`;
}; 