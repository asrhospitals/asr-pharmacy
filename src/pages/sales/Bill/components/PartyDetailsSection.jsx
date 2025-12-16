import React from "react";
import Input from "../../../../componets/common/Input";

const PartyDetailsSection = ({
  form,
  setForm,
  onShowPatientDialog,
  onShowDoctorDialog,
}) => {
  return (
    <>
      {/* Patient & Doctor Section */}
      <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Patient Mob./ID
          </label>
          <Input
            type="text"
            value={form.patientId}
            onClick={onShowPatientDialog}
            readOnly
            placeholder="Click to select patient"
            className="bg-gray-50 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Patient Name
          </label>
          <Input
            type="text"
            value={form.patientName}
            onClick={onShowPatientDialog}
            readOnly
            placeholder="Click to select patient"
            className="bg-gray-50 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Doctor Mob./ID
          </label>
          <Input
            type="text"
            value={form.doctorId}
            placeholder="Doctor ID"
            onFocus={onShowDoctorDialog}
            readOnly
            className="bg-gray-50 cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Doctor Name
          </label>
          <Input
            type="text"
            value={form.doctorName}
            placeholder="Doctor Name"
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          />
        </div>
      </div>

      {/* Address Section */}
      <div className="pb-6 border-b border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Address
        </label>
        <Input
          type="text"
          value={form.address}
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
    </>
  );
};

export default PartyDetailsSection;
