import { useState } from 'react';
import InputName from '../../global/form/InputName';
import Editor from '../../global/form/Editor';
import ErrorBoundary from '../../global/ErrorBoundary';
import MultipleImage from '../../global/form/MultipleImage';
import InputOption from '../../global/form/InputOption';
import { validateImpactForm } from '../../../validations/ImpactValidation';

const ImpactForm = () => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    foundUses: "",
    type: "",
    count: "",
    description: "",
    gallery: [],
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      foundUses: "",
      type: "",
      count: "",
      description: "",
      gallery: [],
    });
    setErrors({});
  };

  const handleSubmit = () => {
    const validationErrors = validateImpactForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    console.log("Form submitted:", formData);

    resetForm();
  };

  return (
    <div className="bg-white rounded-[15px] pt-5 pb-11 flex flex-col gap-7 w-full">
      <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-2.5 w-full pb-12 border-b px-5 border-black/40">
        <div className="w-full xl:w-[25%] flex flex-col gap-0.5">
          <h2 className="font-medium text-base sm:text-lg xl:text-[20px]">Impact Basics</h2>
          <p className="text-xs sm:text-sm text-black/50 leading-[21px]">
            Tell us about your cause and what you're raising funds for.
          </p>
        </div>

        <div className="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
          <div className="xl:col-span-2">
        <MultipleImage
  value={formData.gallery}
  onChange={(images) => {
    setFormData((prev) => ({ ...prev, gallery: images }));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.gallery;
      return updated;
    });
  }}
  error={errors.gallery}
  label="Image Uploads"
/>

          </div>

          <InputName
            label="Title"
            value={formData.title}
            onChange={handleChange("title")}
            error={errors.title}
          />

          <InputOption
            label="Type"
            name="type"
            value={formData.type}
            onChange={(val) => {
              setFormData((prev) => ({ ...prev, type: val }));
              setErrors((prev) => {
                const updated = { ...prev };
                delete updated.type;
                return updated;
              });
            }}
            error={errors.type}
            options={[
              { id: 1, title: "Conference" },
              { id: 2, title: "Workshop" },
              { id: 3, title: "Webinar" },
            ]}
          />

          <InputName
            label="Found Uses"
            value={formData.foundUses}
            onChange={handleChange("foundUses")}
            error={errors.foundUses}
          />

          <InputName
            label="Impact Count"
            value={formData.count}
            onChange={handleChange("count")}
            error={errors.count}
          />

          <div className="xl:col-span-2">
            <ErrorBoundary>
              <Editor
                content={formData.description}
                setContent={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                error={errors.description}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center justify-end w-full px-3.5">
        <button
          type="button"
          onClick={resetForm}
          className="btn-secondary w-[50%] sm:w-[148px] h-[50px]"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary w-[50%] sm:w-[210px] h-[50px]"
        >
          Create Impact
        </button>
      </div>
    </div>
  );
};

export default ImpactForm;
