import React from "react";
import { SelectField, TextField } from "../../../../../componets/common/Fields";
import SearchableSelect from "../../../../../componets/common/SearchableSelect";

const LeftColumn = ({ errors, register, allData, states, setters, setValue }) => {
  return (
    <div className="space-y-3">
      <TextField
        errors={errors}
        register={register}
        required
        label="Packing"
        name="packing"
      />
      {/* Rack (Store) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rack *
        </label>
        <SearchableSelect
          options={allData?.rackData?.map((s) => ({ label: s.rackname, value: s.id }))}
          value={states?.selectedRack}
          onChange={(opt) => {
            setters.setSelectedRack(opt.value);
            setValue("rack", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Rack"
        />
        {errors.rack && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a rack.
          </div>
        )}
      </div>
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company *
        </label>
        <SearchableSelect
          options={allData?.companyData?.map((s) => ({ label: s.companyname, value: s.id }))}
          value={states?.selectedCompany}
          onChange={(opt) => {
            setters.setSelectedCompany(opt.value);
            setValue("company", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Company"
        />
        {errors.company && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a company.
          </div>
        )}
      </div>
      {/* Salt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Salt
        </label>
        <SearchableSelect
          options={allData?.saltData?.map((s) => ({ label: s.saltname, value: s.id }))}
          value={states?.selectedSalt}
          onChange={(opt) => {
            setters.setSelectedSalt(opt.value);
            setValue("salt", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Salt"
        />
        {errors.salt && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a salt.
          </div>
        )}
      </div>
      {/* Unit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unit *
        </label>
        <SearchableSelect
          options={allData?.unitData?.map((s) => ({ label: s.unitName, value: s.id }))}
          value={states?.selectedUnit}
          onChange={(opt) => {
            setters.setSelectedUnit(opt.value);
            setValue("unit1", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Unit"
        />
        {errors.unit1 && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a unit.
          </div>
        )}
      </div>
      {/* HSN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          HSN/SAC *
        </label>
        <SearchableSelect
          options={allData?.hsnData?.map((s) => ({ label: s.hsnsacname, value: s.id }))}
          value={states?.selectedHSN}
          onChange={(opt) => {
            setters.setSelectedHSN(opt.value);
            setValue("hsnsac", opt.value, { shouldValidate: true });
          }}
          placeholder="Select HSN/SAC"
        />
        {errors.hsnsac && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a HSN/SAC.
          </div>
        )}
      </div>
      {/* Other fields */}
      <TextField
        register={register}
        errors={errors}
        label="Unit-2"
        name="unit2"
      />
      <TextField
        register={register}
        errors={errors}
        label="Conversion *"
        name="conversion"
        required
        message="Conversion is required"
      />
      <SelectField
        register={register}
        errors={errors}
        label="Unit in Decimal"
        name="unitindecimal"
        options={["No", "Yes"]}
      />
      <TextField
        register={register}
        errors={errors}
        label="Tax Category*"
        name="taxcategory"
        required
        message="Tax Category is required"
      />
    </div>
  );
};

export default LeftColumn;
