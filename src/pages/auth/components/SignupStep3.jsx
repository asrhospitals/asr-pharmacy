import { useState } from "react";

const RenderStep3 = () => {
  
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Create Your Company
        </h3>
        <p className="text-gray-600">Set up your business profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="branchCode"
            value={formData.branchCode}
            onChange={handleChange}
            placeholder="Enter branch code"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={states.map((state) => ({ value: state, label: state }))}
            placeholder="Select state"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Enter PIN code"
            maxLength={6}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            options={businessTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="calendarType"
            value={formData.calendarType}
            onChange={handleChange}
            options={calendarTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Year From <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="financialYearFrom"
            value={formData.financialYearFrom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Year To <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="financialYearTo"
            value={formData.financialYearTo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            options={taxTypes.map((type) => ({ value: type, label: type }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Phone
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter company phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Website
          </label>
          <Input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Email
          </label>
          <Input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="Enter company email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Registration Type
          </label>
          <Input
            type="text"
            name="companyRegType"
            value={formData.companyRegType}
            onChange={handleChange}
            placeholder="e.g., Private Limited, Partnership"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PAN Number
        </label>
        <Input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="Enter PAN number"
          maxLength={10}
        />
      </div>
    </div>
  );
};

export default RenderStep3;
