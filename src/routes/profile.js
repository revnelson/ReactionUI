import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAuth } from "../lib/hooks";
import { Card } from "../components/ui";
import { underlineAnimation } from "../style/effects";

const About = () => {
  const [t] = useTranslation("common");
  const { auth } = useAuth();

  return (
    <React.Fragment>
      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <Card>
        <div>
          <p
            css={tw`text-2xl text-near-black font-bold`}
            css={underlineAnimation}
          >
            {auth.username}
          </p>
        </div>
        <div css={tw`text-sm`}>
          <p css={tw`text-green mb-1 flex item-center`}>Member since:</p>
          <p css={tw`text-grey-d1`}>Since last month</p>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default About;
