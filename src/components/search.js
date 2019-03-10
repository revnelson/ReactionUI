import React from "react";
import { ReactComponent as FaSearch } from "../icons/solid/search.svg";

export const Search = () => (
  <div
    css={tw`flex w-1/2 invisible md:visible md:w-1/3 text-white md:justify-start px-2`}
  >
    <span css={tw`relative w-full`}>
      <input
        type="search"
        placeholder="Search"
        css={tw`w-full bg-near-white text-sm text-near-black transition border border-transparent focus:outline-none focus:border-grey-l3 rounded py-1 px-2 pl-10 appearance-none leading-normal`}
      />
      <div
        css={tw`absolute search-icon`}
        style={{ top: ".5rem", left: ".8rem" }}
      >
        <FaSearch
          css={tw`fill-current pointer-events-none text-grey-l1 w-4 h-4 mb-2`}
        />
      </div>
    </span>
  </div>
);
