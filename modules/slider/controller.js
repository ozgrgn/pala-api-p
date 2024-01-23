import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addSlider = async (req, res) => {
  const {
    image,
    order,
    isActive,
  } = req.body;

  try {
    let slider = await Service.addSlider(
      image,
      order,
      isActive
    );

    return res.json({
      status: true,
      slider,
    });
  } catch (error) {
    console.log(error.message, "addSlider error");
    return res.json({ status: false, message: error.message });
  }
};

const updateSlider = async (req, res) => {
  const { slider } = req.body;
  const { sliderId } = req.params;
  console.log(slider, "sdsfsfsdfsdsf");
  try {
    let updatedSlider = await Service.updateSlider(sliderId, slider);

    return res.json({
      status: true,
      updatedSlider,
    });
  } catch (error) {
    console.log(error.message, "updateSlider error");
    return res.json({ status: false, message: error.message });
  }
};

const deleteSlider = async (req, res) => {
  const { sliderId } = req.params;

  try {
    await Service.deleteSlider(sliderId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deleteSlider error");
    return res.json({ status: false, message: error.message });
  }
};

const getSliders = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const slidersQuery = _.omitBy(
      {
        lang,
      },
      (a) => a === undefined
    );
    let sliders = await Service.getSliders(slidersQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...sliders });
  } catch (error) {
    console.log(error.message, "getSliders error");
    return res.json({ status: false, message: error.message });
  }
};

const getSlider = async (req, res) => {
  try {
    const SliderQuery = _.omitBy(
      {
        _id: req.params.sliderId,
      },
      (a) => a === undefined
    );

    let slider = await Service.getSlider(SliderQuery);
    return res.json({ status: true, slider });
  } catch (error) {
    console.log(error.message, "getSlider error");
    return res.json({ status: false, message: error.message });
  }
};

const getSliderLastSort = async (req, res) => {
  try {
    let sliderLast = await Service.getSliderLastSort();
    return res.json({ status: true, lastSort: sliderLast.order });
  } catch (error) {
    console.log(error.message, "getLastSlider error");
    return res.json({ status: false, message: error.message });
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
