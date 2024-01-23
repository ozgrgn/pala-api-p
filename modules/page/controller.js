import Service from "./service.js";
import _ from "lodash";
import moment from "moment";
const addPage = async (req, res) => {
  const { name, perma, lang, content } = req.body;

  try {
    let page = await Service.addPage(name, perma, lang, content);

    return res.json({
      status: true,
      page,
    });
  } catch (error) {
    console.log(error.message, "addPage error");
    return res.json({ status: false, message: error.message });
  }
};

const updatePage = async (req, res) => {
  const { page } = req.body;
  const { pageId } = req.params;
  try {
    let updatedPage = await Service.updatePage(pageId, page);

    return res.json({
      status: true,
      updatedPage,
    });
  } catch (error) {
    console.log(error.message, "updatePage error");
    return res.json({ status: false, message: error.message });
  }
};

const deletePage = async (req, res) => {
  const { pageId } = req.params;

  try {
    await Service.deletePage(pageId);

    return res.json({
      status: true,
    });
  } catch (error) {
    console.log(error.message, "deletePage error");
    return res.json({ status: false, message: error.message });
  }
};

const getPages = async (req, res) => {
  const { limit, skip, lang } = req.query;

  try {
    const pagesQuery = _.omitBy(
      {
        lang:lang
      },
      (a) => a === undefined
    );
    let pages = await Service.getPages(pagesQuery, {
      queryOptions: { limit, skip },
    });

    return res.json({ status: true, ...pages });
  } catch (error) {
    console.log(error.message, "getPages error");
    return res.json({ status: false, message: error.message });
  }
};

const getPage = async (req, res) => {
  try {
    const PageQuery = _.omitBy(
      {
        _id: req.params.pageId,
      },
      (a) => a === undefined
    );

    let page = await Service.getPage(PageQuery);
    return res.json({ status: true, page });
  } catch (error) {
    console.log(error.message, "getPage error");
    return res.json({ status: false, message: error.message });
  }
};

const getPageViaPerma = async (req, res) => {
  try {
    const EventQuery = _.omitBy(
      {
        perma: req.params.perma,
      },
      (a) => a === undefined
    );

    let page = await Service.getPageViaPerma(EventQuery);
    return res.json({ status: true, page });
  } catch (error) {
    console.log(error.message, "getPage error");
    return res.json({ status: false, message: error.message });
  }
};
export default {
  addPage,
  updatePage,
  deletePage,
  getPages,
  getPage,
  getPageViaPerma
};
