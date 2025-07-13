import React from "react";
import { SelectField, TextField } from "../../../../../componets/common/Fields";

const RightColumn = ({ errors, register }) => {
  return (
    <div className="space-y-3">
      <TextField
        register={register}
        errors={errors}
        label="M.R.P"
        name="price"
        type="number"
      />
      <TextField
        register={register}
        errors={errors}
        label="Purchase Rate"
        name="purchasePrice"
        type="number"
      />
      <TextField
        register={register}
        errors={errors}
        label="Cost"
        name="cost"
        type="number"
      />
      <TextField
        register={register}
        errors={errors}
        label="S.Rate"
        name="salerate"
        type="number"
      />
      <SelectField
        register={register}
        errors={errors}
        label="Narcotics"
        name="narcotic"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule H"
        name="scheduleH"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule H1"
        name="scheduleH1"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule Drug"
        name="scheduledrug"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Presc. Required"
        name="prescription"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Storage Type"
        name="storagetype"
        options={["Normal", "Cold"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Status"
        name="status"
        options={["Continue", "Discontinued"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Color Type"
        name="colortype"
        options={["---Blank---"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="TB Item"
        name="tbitem"
        options={["Normal", "Special"]}
      />
    </div>
  );
};

export default RightColumn;
