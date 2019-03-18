import React from "react";
import { Field, FieldArray } from "formik";
import { ReactComponent as PlusIcon } from "../icons/solid/plus.svg";
import { ReactComponent as MinusIcon } from "../icons/solid/minus.svg";
import { ReactComponent as DownIcon } from "../icons/solid/chevron-down.svg";
import { langs } from "../../config";
import { useTranslation } from "react-i18next";

export const NameSelect = ({ values, fieldStyle }) => {
  const [t] = useTranslation("auth");
  const allLangs = Object.values(langs).map(lang => lang.code);
  const selectedLangs = values.names.map(name => name.lang);
  const availableLangs = allLangs.filter(lang => !selectedLangs.includes(lang));

  return (
    <FieldArray
      name="names"
      render={({ remove, insert, push }) => (
        <div className={tw`w-full`}>
          {values.names &&
            values.names.map((name, index) => (
              <div key={`names.${index}`} css={tw`flex flex-row`}>
                <div css={tw`w-1/3 mr-4 relative mb-4`} id="names-options">
                  <Field
                    value={name.lang}
                    component="select"
                    name={`names.${index}.lang`}
                    css={tw`appearance-none cursor-pointer py-3 px-2 pr-8 text-grey-d2 leading-tight text-xs focus:outline-none focus:border-0`}
                  >
                    {Object.entries(langs).map(([key, lang], index) => (
                      <option
                        key={lang.code}
                        value={lang.code}
                        disabled={selectedLangs.includes(lang.code)}
                        css={tw`text-xs`}
                        css={
                          selectedLangs.includes(lang.code)
                            ? tw`text-grey-l2`
                            : tw`text-grey-d2`
                        }
                      >
                        {lang.name}
                      </option>
                    ))}
                  </Field>
                  <div
                    css={tw`pointer-events-none absolute pin-y pin-r mr-4 flex items-center px-2 text-near-black`}
                  >
                    <DownIcon css={tw`h-2 w-2`} />
                  </div>
                </div>
                <Field
                  component="input"
                  name={`names.${index}.title`}
                  css={fieldStyle}
                  css={tw`w-5/6`}
                />
                <div css={tw`inline-block px-4 pt-2`}>
                  {values.names.length > 1 && (
                    <MinusIcon
                      css={tw`h-2 w-2 cursor-pointer -mr-4`}
                      onClick={() => remove(index)}
                    />
                  )}
                </div>
              </div>
            ))}
          <div
            css={tw`flex p-4 flex-1 justify-end text-near-black fill-current`}
          >
            {values.names.length < allLangs.length && (
              <div
                css={tw`rounded-full bg-near-white py-4 hover:bg-secondary hover:text-near-black text-grey-l1 px-6 shadow cursor-pointer`}
                onClick={() => push({ lang: availableLangs[0], title: "" })}
                className="transition"
              >
                <span css={tw`text-sm pr-4`}>{t("auth:add-lang-name")}</span>
                <PlusIcon css={tw`h-3 w-3 inline-block text-near-black`} />
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};
