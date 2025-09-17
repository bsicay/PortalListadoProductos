const single = (
  resource,
  { showSensitiveData = false, showCreatorInfo = false } = {},
) => {
  const {
    id,
    name,
    description,
    price,
    sku,
    inventory,
    image,
    created_by,
    updated_by,
    created_at,
    updated_at,
    created_by_name,
    updated_by_name,
  } = resource;

  return {
    id,
    name,
    description,
    price,
    sku,
    inventory,
    image,
    created_by: showSensitiveData || showCreatorInfo ? created_by : undefined,
    updated_by: showSensitiveData || showCreatorInfo ? updated_by : undefined,
    created_at: showSensitiveData ? created_at : undefined,
    updated_at: showSensitiveData ? updated_at : undefined,
    created_by_name: showCreatorInfo ? created_by_name : undefined,
    updated_by_name: showCreatorInfo ? updated_by_name : undefined,
  };
};

const multiple = (resources, { showSensitiveData, showCreatorInfo } = {}) => 
  resources?.map((resource) => single(resource, { showSensitiveData, showCreatorInfo }));

export { single, multiple };
