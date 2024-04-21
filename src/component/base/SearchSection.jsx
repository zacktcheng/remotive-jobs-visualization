import React from "react";
import { Context } from "../compound/Content";
import Section from "./Section";

const SearchSection = () => {

  const removetiveApiURL = '';
  const {} = React.useContext(Context);
  const handleClick = async () => {
    try {
      const res = fetch(removetiveApiURL);
      const data = (await res).json();

    } catch (err) {}
  }
  return (
    <Section>

    </Section>
  );
}

export default SearchSection;