import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function GlobalEditableTable({ columns, rows, setRows, minRows = 1 }) {
  const handleCellChange = (rowIdx, key, value) => {
    const updated = [...rows];
    updated[rowIdx][key] = value;
    setRows(updated);
  };

  const addRow = () => {
    const emptyRow = {};
    columns.forEach(col => {
      emptyRow[col.key] = col.type === 'select' ? (col.options?.[0]?.value ?? '') : '';
    });
    setRows([...rows, emptyRow]);
  };

  const removeRow = (idx) => {
    if (rows.length > minRows) {
      setRows(rows.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-lg text-xs mb-2 bg-white shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(col => (
              <th key={col.key} className="border px-3 py-2">{col.label}</th>
            ))}
            <th className="border px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition">
              {columns.map(col => (
                <td key={col.key} className="border px-3 py-2">
                  {col.type === 'autocomplete' ? (
                    <Autocomplete
                      options={col.options || []}
                      value={row[col.key] || ''}
                      onChange={(_, value) => handleCellChange(idx, col.key, value)}
                      freeSolo
                      size="small"
                      renderInput={params => <TextField {...params} label={col.label} variant="outlined" size="small" />}
                    />
                  ) : col.type === 'select' ? (
                    <Select
                      value={row[col.key] ?? ''}
                      onChange={e => handleCellChange(idx, col.key, e.target.value)}
                      size="small"
                      fullWidth
                    >
                      {(col.options || []).map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <TextField
                      value={row[col.key] ?? ''}
                      onChange={e => handleCellChange(idx, col.key, e.target.value)}
                      label={col.label}
                      type={col.type === 'number' ? 'number' : 'text'}
                      size="small"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </td>
              ))}
              <td className="border px-3 py-2 text-center">
                <IconButton
                  aria-label="remove"
                  color="error"
                  size="small"
                  onClick={() => removeRow(idx)}
                  disabled={rows.length <= minRows}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <IconButton aria-label="add" color="primary" onClick={addRow}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
