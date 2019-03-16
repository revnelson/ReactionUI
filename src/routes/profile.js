import React from "react";
import Helmet from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useAuth } from "../lib/hooks";
import { Card } from "../components/ui";
import { underlineAnimation } from "../style/effects";
import moment from "moment";

const About = () => {
  const [t, i18n] = useTranslation("common");
  const { auth } = useAuth();
  console.log("PROFILE Names: ", auth.name);
  const name =
    auth.name[i18n.language] ||
    Object.keys(auth.name).map(key => {
      if (auth.name[key]) return auth.name[key];
    })[0];

  const memberSince = moment(auth.createdAt).format("MMM Do YYYY");
  console.log(memberSince);
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

          <p css={tw`text-lg text-near-black`}>{name}</p>
        </div>
        <div css={tw`text-sm`}>
          <p css={tw`text-green mb-1 flex item-center`}>Member since:</p>
          <p css={tw`text-grey-d1`}>{memberSince}</p>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default About;
