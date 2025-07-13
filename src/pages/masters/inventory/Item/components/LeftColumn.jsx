import React from "react";
import { SelectField, TextField } from "../../../../../componets/common/Fields";

const LeftColumn = ({ errors, register }) => {
  return (
    <div className="space-y-3">
      <TextField
        errors={errors}
        register={register}
        required
        label="Packing"
        name="packing"
      />
      <TextField
        register={register}
        errors={errors}
        label="Unit 1st *"
        name="unit1"
        required
        message="Unit 1st is required"
      />
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
        label="HSN/SAC*"
        name="hsnsac"
        required
        message="HSN/SAC is required"
      />
      <TextField
        register={register}
        errors={errors}
        label="Tax Category*"
        name="taxcategory"
        required
        message="Tax Category is required"
      />
      <TextField
        register={register}
        errors={errors}
        label="Company *"
        name="company"
        required
        message="Company is required"
      />
      <TextField register={register} errors={errors} label="Salt" name="salt" />
      <TextField register={register} errors={errors} label="Rack" name="rack" />
    </div>
  );
};

export default LeftColumn;
