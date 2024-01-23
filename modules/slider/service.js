import Model from "./model.js";

const getSliders = async (query = {}, options = {}) => {
  console.log(query, "query")
  const { queryOptions } = options;

  const sliders = await Model.Slider.find(query, {}, queryOptions)
    .sort({
      order: 1,
    });
  const count = await Model.Slider.countDocuments(query);

  return { sliders, count };
};

const getSlider = async (query) => {
  return Model.Slider.findOne(query);
};

const addSlider = async (
  image,
  order,
  isActive
) => {
  try {
    return new Model.Slider({
      image,
      order,
      isActive,
    }).save();
  } catch (error) {
    console.log("addSlider service error", error);
    throw new Error(error.message);
  }
};

const updateSlider = async (sliderId, slider) => {
  try {
    let isExistSlider = await Model.Slider.findById(sliderId);

    if (!isExistSlider) {
      throw new Error(
        JSON.stringify({
          en: "Slider is not found.",
          tr: "Slider bulunamadı.",
        })
      );
    }

    return Model.Slider.findOneAndUpdate(
      { _id: isExistSlider._id },
      { ...slider },
      { new: true }
    );
  } catch (error) {
    console.log("updateSlider service error", error);
    throw new Error(error.message);
  }
};

const deleteSlider = async (sliderId) => {
  try {
    return Model.Slider.deleteOne({ _id: sliderId });
  } catch (error) {
    console.log("deleteSlider service error", error);
    throw new Error(error.message);
  }
};

const getSliderLastSort = async () => {
  try {
    return Model.Slider.findOne().sort({
      order: -1,
    });
  } catch (error) {
    console.log("getLastSlider service error", error);
    throw new Error(error.message);
  }
};

export default {
  addSlider,
  updateSlider,
  deleteSlider,
  getSliders,
  getSlider,
  getSliderLastSort,
};
