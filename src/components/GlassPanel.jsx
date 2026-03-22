const GlassPanel = ({ as: Component = "div", className = "", children, ...props }) => {
  return (
    <Component className={`glass-panel ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default GlassPanel;
