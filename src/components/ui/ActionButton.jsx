const variantClasses = {
  primary: 'action-button action-button-primary',
  secondary: 'action-button action-button-secondary',
  outline: 'action-button action-button-outline',
  ghost: 'action-button action-button-ghost'
};

const sizeClasses = {
  sm: 'action-button-small',
  md: 'action-button-medium',
  lg: 'action-button-large'
};

function mergeClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ActionButton({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  type,
  ...props
}) {
  const resolvedType = Component === 'button' && !type ? 'button' : type;
  const classNames = mergeClasses(variantClasses[variant] ?? variantClasses.primary, sizeClasses[size] ?? sizeClasses.md, className);

  return (
    <Component className={classNames} type={resolvedType} {...props}>
      {leftIcon ? <span className="button-icon button-icon-left">{leftIcon}</span> : null}
      <span className="button-label">{children}</span>
      {rightIcon ? <span className="button-icon button-icon-right">{rightIcon}</span> : null}
    </Component>
  );
}
