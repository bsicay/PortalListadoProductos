const single = (resource) => {
  const {
    id,
    name,
    email,
    role,
    is_active,
    created_at,
    updated_at,
  } = resource;

  return {
    id,
    name,
    email,
    role,
    is_active,
    created_at,
    updated_at,
  };
};

export { single };
