import gql from "graphql-tag";

export const sidebarToggleMutation = gql`
  mutation sidebarToggle($state: Boolean) {
    sidebarToggle(state: $state) @client
  }
`;

// export const openDrawerToggleQuery = gql`
//   mutation openDrawerToggle {
//     openDrawerToggle @client
//   }
// `;

// export const toggleAllQuery = gql`
//   mutation toggleAll($width: Int, $height: Int) {
//     toggleAll(width: $width, height: $height) @client
//   }
// `;

// export const openKeysChangeQuery = gql`
//   mutation openKeysChange($openKeys: [String]) {
//     openKeysChange(openKeys: $openKeys) @client
//   }
// `;

// export const currentChangeQuery = gql`
//   mutation currentChange($current: [String]) {
//     currentChange(current: $current) @client
//   }
// `;
