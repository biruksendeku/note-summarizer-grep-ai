export const createPattern = (terms) => {
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return escaped.join("|");
};
