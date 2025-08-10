interface INutritionInfoProps {
  label: string;
  value: number;
}

export const NutritionInfo = ({ label, value }: INutritionInfoProps) => (
  <div>
    <p className="text text_type_main-default text_color_inactive mb-2">
      {label}
    </p>
    <p className="text text_type_digits-default text_color_inactive">{value}</p>
  </div>
);
