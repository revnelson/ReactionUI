import React, { useEffect } from "react";
import { withApollo } from "react-apollo";
import { checkAuthQuery } from "../../src/api";
import { queries, withAuthStore } from "../../src/store/Auth";
import { useApolloClient, useQuery, useMutation } from "react-apollo-hooks";
import { setUserMutation } from "../../src/store/Auth/mutations";

// const UserInjectorWithoutClient = ({ children }) => {
//   const {
//     data: { auth }
//   } = useQuery(queries.authQuery);

//   const checkUser = async () => {
//     try {
//       const {
//         data: { checkAuth }
//       } = await useQuery(checkAuthQuery);
//       if (checkAuth) {
//         const user = useMutation(setUserMutation, {
//           variables: { user: checkAuth }
//         });
//       }
//     } catch (err) {
//       console.log("Error injecting user: ", err);
//     }
//   };

//   useEffect(() => {
//     !auth.id && checkUser();
//   });

//   return children;
// };

// export const UserInjector = UserInjectorWithoutClient;

const UserInjectorWithoutClient = ({ children, client, setUserMutation }) => {
  const { auth } = client.readQuery({ query: queries.authQuery });
  const checkUser = async () => {
    console.log("Checking...");
    try {
      const {
        data: { checkAuth }
      } = await client.query({ query: checkAuthQuery });
      checkAuth && setUserMutation({ variables: { user: checkAuth } });
    } catch (err) {
      console.log("Error injecting user: ", err);
    }
  };

  useEffect(() => {
    !auth.id && checkUser();
  });

  return children;
};

export const UserInjector = withApollo(
  withAuthStore(UserInjectorWithoutClient)
);
