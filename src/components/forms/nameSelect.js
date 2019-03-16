import React from "react";
import { Field, FieldArray } from "formik";
import { ReactComponent as PlusIcon } from "../../icons/solid/plus.svg";
import { ReactComponent as MinusIcon } from "../../icons/solid/minus.svg";
import { langs } from "../../../config";

export const NameSelect = ({ values }) => {
  const allLangs = Object.values(langs).map(lang => lang.code);
  const selectedLangs = values.names.map(name => name.lang);
  const availableLangs = allLangs.filter(lang => !selectedLangs.includes(lang));

  return (
    <FieldArray
      name="names"
      render={({ remove, insert, push }) => (
        <div>
          {values.names &&
            values.names.map((name, index) => (
              <div key={`names.${index}`} css={tw`flex flex-row`}>
                <div>
                  <Field
                    value={name.lang}
                    component="select"
                    name={`names.${index}.lang`}
                  >
                    {Object.entries(langs).map(([key, lang], index) => (
                      <option
                        key={lang.code}
                        value={lang.code}
                        disabled={selectedLangs.includes(lang.code)}
                        css={tw`text-grey-d2 text-sm`}
                      >
                        {lang.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div css={tw`flex`}>
                  <Field
                    component="input"
                    name={`names.${index}.title`}
                    css={tw`bg-transparent border-b m-auto block border-grey mb-6 text-grey-d1 pb-1`}
                  />
                  {values.names.length > 1 && (
                    <div css={tw`inline-block px-4 cursor-pointer`}>
                      <MinusIcon
                        css={tw`h-4 w-4`}
                        onClick={() => remove(index)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          <div
            css={tw`flex p-4 flex-1 justify-end text-near-black fill-current`}
          >
            <PlusIcon
              onClick={() => push({ lang: availableLangs[0], title: "" })}
              css={tw`h-4 w-4 inline-block cursor-pointer`}
            />
          </div>
        </div>
      )}
    />
  );
};
