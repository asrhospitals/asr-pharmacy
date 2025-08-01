import React from "react";
import Input from "../../../../../componets/common/Input";
import Select from "../../../../../componets/common/Select";
import { SelectField, TextField } from "../../../../../componets/common/Fields";
import { showToast } from "../../../../../componets/common/Toast";

const InputFields = ({ register, errors }) => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <div className="lg:col-span-2 space-y-4">
        <div>
          <TextField
            label="Salt Name"
            name="saltname"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            label="Salt Code"
            name="saltcode"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            label="Salt Type"
            name="salttype"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            label="Salt Group"
            name="saltgroup"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            label="Salt Sub Group"
            name="saltsubgroup"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <TextField
            label="Salt Sub Sub Group"
            name="saltsubsubgroup"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div>
          <SelectField
            label="Tb Item"
            name="tbitem"
            options={["Normal", "Tb", "Tramadol"]}
            register={register}
            errors={errors}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-300 rounded-xl p-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-2">
            Narcotic Details
          </h3>

          <div>
            <SelectField
              label="Narcotic"
              name="narcotic"
              options={["Yes", "No"]}
              register={register}
              errors={errors}
            />
          </div>

          <div>
            <SelectField
              label="Schedule H2"
              name="scheduleh2"
              options={["Yes", "No"]}
              register={register}
              errors={errors}
            />
          </div>

          <div>
            <SelectField
              label="Schedule H3"
              name="scheduleh3"
              options={["Yes", "No"]}
              register={register}
              errors={errors}
            />
          </div>
        </div>

        
        <div>
          <SelectField
            label="Now Status"
            name="nowstatus"
            options={["Continue", "Discontinue"]}
            register={register}
            errors={errors}
          />
        </div>

        <div>
          <SelectField
            label="Prohibited"
            name="prohibited"
            options={["Yes", "No"]}
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default InputFields;
