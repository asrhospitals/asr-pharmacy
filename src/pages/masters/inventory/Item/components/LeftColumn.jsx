import React from "react";
import { SelectField, TextField } from "../../../../../componets/common/Fields";
import SearchableSelect from "../../../../../componets/common/SearchableSelect";

const LeftColumn = ({
  errors,
  register,
  allData,
  states,
  setters,
  setValue,
  onCreateRack,
  onCreateUnit,
  onCreateHSN,
  onCreateCompany,
  onCreateSalt,
  onCreateTaxCategory,
}) => {
  
  return (
    <div className="space-y-3">
      <TextField
        errors={errors}
        register={register}
        label={"Contraindications"}
        name="contraindications"
      />
      <TextField
        errors={errors}
        register={register}
        label={"Relative Contraindications"}
        name="relativeContraindications"
      />
      <TextField
        errors={errors}
        register={register}
        required
        label="Packing"
        name="packing"
      />

      <div>
        <label className="block font-medium mb-1">
          Rack *
        </label>
        <SearchableSelect
          options={allData?.rackData?.data?.map((s) => ({
            label: s.rackname,
            value: s.id,
          }))}
          value={states?.selectedRack}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateRack && onCreateRack();
              return;
            }
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

      <div>
        <label className="block font-medium mb-1">
          Company *
        </label>
        <SearchableSelect
          options={allData?.companyData?.data?.map((s) => ({
            label: s.companyname,
            value: s.id,
          }))}
          value={states?.selectedCompany}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateCompany && onCreateCompany();
              return;
            }
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

      <div>
        <label className="block font-medium mb-1">
          Salt
        </label>
        <SearchableSelect
          options={allData?.saltData?.data?.map((s) => ({
            label: s.saltname,
            value: s.id,
          }))}
          value={states?.selectedSalt}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateSalt && onCreateSalt();
              return;
            }
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

      <div>
        <label className="block font-medium mb-1">
          Unit *
        </label>
        <SearchableSelect
          options={allData?.unitData?.data?.map((s) => ({
            label: s.unitName,
            value: s.id,
          }))}
          value={states?.selectedUnit}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateUnit && onCreateUnit();
              return;
            }
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
      <div>
        <label className="block font-medium mb-1">
          Unit-2
        </label>
        <SearchableSelect
          options={allData?.unitData?.data?.map((s) => ({
            label: s.unitName,
            value: s.id,
          }))}
          value={states?.selectedUnit2}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateUnit && onCreateUnit();
              return;
            }
            setters.setSelectedUnit2(opt.value);
            setValue("unit2", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Unit"
        />
        {errors.unit2 && (
          <div className="text-red-600 font-semibold text-sm mt-1">
            Please select a unit.
          </div>
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">
          HSN/SAC *
        </label>
        <SearchableSelect
          options={allData?.hsnData?.data?.map((s) => ({
            label: s.hsnsacname,
            value: s.id,
          }))}
          value={states?.selectedHSN}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateHSN && onCreateHSN();
              return;
            }
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
      <TextField
        register={register}
        errors={errors}
        label="Conversion"
        name="conversion"
        message="Conversion is required"
      />
      <SelectField
        register={register}
        errors={errors}
        label="Unit in Decimal"
        name="unitindecimal"
        options={["No", "Yes"]}
      />
      <div>
        <label
          className="block font-medium mb-1"
          htmlFor="taxcategory"
        >
          Tax Category
        </label>
        <SearchableSelect
          options={allData?.taxcategoryData?.data?.map((s) => ({
            label: s.purchaseType,
            value: s.id,
          }))}
          value={states?.selectedTaxCategory}
          allowCreate={true}
          onChange={(opt) => {
            if (opt.isNew) {
              onCreateTaxCategory && onCreateTaxCategory();
              return;
            }
            setters.setSelectedTaxCategory(opt.value);
            setValue("taxcategory", opt.value, { shouldValidate: true });
          }}
          placeholder="Select Tax Category"
        />
      </div>
    </div>
  );
};

export default LeftColumn;
