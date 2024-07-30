// Common function to generate new ID
const getNewId = async (key, totalCount) => {
  try {
    if (!totalCount[key]) {
      throw new Error(`${key} not found in CounterId document`);
    }
    let masterIdValue = parseInt(totalCount[key].slice(1));
    let initial = totalCount[key].charAt(0);
    masterIdValue += 1;
    const newId = initial + masterIdValue;
    return newId;
  } catch (error) {
    throw new Error(`Backend Issue getNewId! ${error.message}`);
  }
};

module.exports = { getNewId };
