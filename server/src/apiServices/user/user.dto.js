const single = (
  resource,
  { showSensitiveData = false, showRole = false } = {},
) => {
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
    email: showSensitiveData ? email : undefined,
    role: showSensitiveData || showRole ? role : undefined,
    is_active: showSensitiveData ? is_active : undefined,
    created_at: showSensitiveData ? created_at : undefined,
    updated_at: showSensitiveData ? updated_at : undefined,
  };
};

const multiple = (resources, { showSensitiveData, showRole } = {}) => 
  resources?.map((resource) => single(resource, { showSensitiveData, showRole }));

export { single, multiple };
