import PropTypes from "prop-types";

export const NutritionInfo = ({ label, value }) => (
  <div>
    <p className="text text_type_main-default text_color_inactive mb-2">
      {label}
    </p>
    <p className="text text_type_digits-default text_color_inactive">{value}</p>
  </div>
);

NutritionInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
