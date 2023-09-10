import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ArrowRight, ArrowUp, ArrowDown } from "react-bootstrap-icons";

export default function FilterBar({
  onLetterFilter,
  onPriceFilter,
  onDateFilter,
  dateFilter,
}) {
  const handleSortChange = (order) => {
    onLetterFilter(order);
  };

  const handlePriceFilter = (option) => {
    onPriceFilter(option);
  };

  const handleDateFilter = (filterType) => {
    onDateFilter(filterType);
  };

  return (
    // <div className="mb-3">
    <Dropdown>
      <Dropdown.Toggle
        variant="secondary"
        id="filterDropdown"
        as={"button"}
        className="btn btn-primary filter-btn"
      >
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSortChange("asc")}>
          A <ArrowRight /> Z
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortChange("desc")}>
          Z <ArrowRight /> A
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceFilter("asc")}>
          Price <ArrowUp />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handlePriceFilter("desc")}>
          Price <ArrowDown />
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDateFilter("newest")}>
          Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleDateFilter("oldest")}>
          Oldest
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    // </div>
  );
}
