const encodePathComponent = (component: string): string => {
  // Allowed: $ .
  component = component.replace(/[`~!@#%^&*()+={}\[\]|\\:;'"<>?,\/]/g, '');
  component = component.replace(/\s/gu, '-');
  // Replace contiguous hyphens with single one
  component = component.replace(/-+/g, '-');
  // Removing starting or trailing hyphens
  component = component.replace(/^-+|-+$/g, '');
  // Replace %24 with non-encoded
  component = encodeURIComponent(component).replace(/%24/g, '$');
  return component;
};

export const encodedPrefixedPath = (prefix: string, ...components: string[]): string => [prefix, ...components.map(encodePathComponent)].join('/');
