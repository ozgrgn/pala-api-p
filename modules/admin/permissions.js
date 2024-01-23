const PERMISSONS = {
  ownerships: {
    has_organizer: "has_organizer",
  },

  permissions: {
    read_permissions: "read_permissions",
  },

  cats: {
    create_cat: "create_cat",
    read_cats: "read_cats",
    read_cat: "read_cat",
    update_cat: "update_cat",
    delete_cat: "delete_cat",
  },
  brands: {
    create_brand: "create_brand",
    read_brands: "read_brands",
    read_brand: "read_brand",
    update_brand: "update_brand",
    delete_brand: "delete_brand",
  },

  memberships: {
    create_membership: "create_membership",
    read_memberships: "read_memberships",
    read_membership: "read_membership",
    update_membership: "update_membership",
    delete_membership: "delete_membership",
  },
  products: {
    create_product: "create_product",
    read_products: "read_products",
    read_product: "read_product",
    update_product: "update_product",
    delete_product: "delete_product",
  },
  units: {
    create_unit: "create_unit",
    read_units: "read_units",
    read_unit: "read_unit",
    update_unit: "update_unit",
    delete_unit: "delete_unit",
  },
  customers: {
    create_customer: "create_customer",
    read_customers: "read_customers",
    read_customer: "read_customer",
    update_customer: "update_customer",
    delete_customer: "delete_customer",
  },
  transactions: {
    create_transaction: "create_transaction",
    read_transactions: "read_transactions",
    read_transaction: "read_transaction",
    update_transaction: "update_transaction",
    delete_transaction: "delete_transaction",
  },
  users: {
    create_user: "create_user",
    read_users: "read_users",
    read_user: "read_user",
    update_user: "update_user",
    delete_user: "delete_user",
  },
  catalogPages: {
    create_catalogPage: "create_catalogPage",
    read_catalogPages: "read_catalogPages",
    read_catalogPage: "read_catalogPage",
    update_catalogPage: "update_catalogPage",
    delete_catalogPage: "delete_catalogPage",
  },
  catalogImages: {
    create_catalogImage: "create_catalogImage",
    read_catalogImages: "read_catalogImages",
    read_catalogImage: "read_catalogImage",
    update_catalogImage: "update_catalogImage",
    delete_catalogImage: "delete_catalogImage",
  },


  sliders: {
    create_slider: "create_slider",
    read_sliders: "read_sliders",
    read_slider: "read_slider",
    update_slider: "update_slider",
    delete_slider: "delete_slider",
  },

  langs: {
    create_lang: "create_lang",
    read_langs: "read_langs",
    read_lang: "read_lang",
    update_lang: "update_lang",
    delete_lang: "delete_lang",
  },

  homes: {
    create_home: "create_home",
    read_homes: "read_homes",
    read_home: "read_home",
    update_home: "update_home",
    delete_home: "delete_home",
  },
  abouts: {
    create_about: "create_about",
    read_abouts: "read_abouts",
    read_about: "read_about",
    update_about: "update_about",
    delete_about: "delete_about",
  },
  treatments: {
    create_treatment: "create_treatment",
    read_treatments: "read_treatments",
    read_treatment: "read_treatment",
    update_treatment: "update_treatment",
    delete_treatment: "delete_treatment",
  },
  treatmentPages: {
    create_treatmentPage: "create_treatmentPage",
    read_treatmentPages: "read_treatmentPages",
    read_treatmentPage: "read_treatmentPage",
    update_treatmentPage: "update_treatmentPage",
    delete_treatmentPage: "delete_treatmentPage",
  },
  permissionGroups: {
    create_permissionGroup: "create_permissionGroup",
    read_permissionGroups: "read_permissionGroups",
    read_permissionGroup: "read_permissionGroup",
    update_permissionGroup: "update_permissionGroup",
    delete_permissionGroup: "delete_permissionGroup",
  },
  contacts: {
    create_contact: "create_contact",
    read_contacts: "read_contacts",
    read_contact: "read_contact",
    update_contact: "update_contact",
    delete_contact: "delete_contact",
  },

  translates: {
    create_translate: "create_translate",
    read_translates: "read_translates",
    read_translate: "read_translate",
    update_translate: "update_translate",
    delete_translate: "delete_translate",
  },
  admins: {
    update_admin_permissionGroup: "update_admin_permissionGroup",
    update_admin_status: "update_admin_status",
    write_admin: "write_admin",
    read_admins: "read_admins",
    read_admin: "read_admin",
    update_admin: "update_admin",
    delete_admin: "delete_admin",
  },

  logs: {
    read_userLogs: "read_userLogs",
    read_systemLogs: "read_systemLogs",
    read_adminLogs: "read_adminLogs",
  },

  tags: {
    create_tag: "create_tag",
    read_tags: "read_tags",
    read_tag: "read_tag",
    update_tag: "update_tag",
    delete_tag: "delete_tag",
  },

  boxOffices: {
    create_boxOffice: "create_boxOffice",
    read_boxOffices: "read_boxOffices",
    read_boxOffice: "read_boxOffice",
    update_boxOffice: "update_boxOffice",
    delete_boxOffice: "delete_boxOffice",
  },

  venues: {
    create_venue: "create_venue",
    read_venues: "read_venues",
    read_venue: "read_venue",
    update_venue: "update_venue",
    delete_venue: "delete_venue",
  },

  categories: {
    create_category: "create_category",
    read_categories: "read_categories",
    read_category: "read_category",
    update_category: "update_category",
    delete_category: "delete_category",
  },

  events: {
    create_event: "create_event",
    read_events: "read_events",
    read_event: "read_event",
    update_event: "update_event",
    delete_event: "delete_event",
  },

  shows: {
    create_show: "create_show",
    read_shows: "read_shows",
    read_show: "read_show",
    update_show: "update_show",
    delete_show: "delete_show",
  },

  sliders: {
    create_slider: "create_slider",
    read_sliders: "read_sliders",
    read_slider: "read_slider",
    update_slider: "update_slider",
    delete_slider: "delete_slider",
  },

  seatPlans: {
    create_seatPlan: "create_seatPlan",
    read_seatPlans: "read_seatPlans",
    read_seatPlan: "read_seatPlan",
    update_seatPlan: "update_seatPlan",
    delete_seatPlan: "delete_seatPlan",
  },

  tickets: {
    create_ticket: "create_ticket",
    read_tickets: "read_tickets",
    read_ticket: "read_ticket",
    update_ticket: "update_ticket",
    delete_ticket: "delete_ticket",
  },

  seats: {
    create_seat: "create_seat",
    create_seats: "create_seats",
    read_seats: "read_seats",
    read_seat: "read_seat",
    update_seat: "update_seat",
    update_seats: "update_seats",
    delete_seat: "delete_seat",
  },

  blocks: {
    create_block: "create_block",
    create_blocks: "create_blocks",
    read_blocks: "read_blocks",
    read_block: "read_block",
    update_block: "update_block",
    delete_block: "delete_block",
  },
  levels: {
    create_level: "create_level",
    create_levels: "create_levels",
    read_levels: "read_levels",
    read_level: "read_level",
    update_level: "update_level",
    delete_level: "delete_level",
  },
  deals: {
    create_deal: "create_deal",
    create_deals: "create_deals",
    read_deals: "read_deals",
    read_deal: "read_deal",
    update_deal: "update_deal",
    delete_deal: "delete_deal",
  },
  pages: {
    create_page: "create_page",
    create_pages: "create_pages",
    read_pages: "read_pages",
    read_page: "read_page",
    update_page: "update_page",
    delete_page: "delete_page",
  },
  generals: {
    create_general: "create_general",
    create_generals: "create_generals",
    read_generals: "read_generals",
    read_general: "read_general",
    update_general: "update_general",
    delete_general: "delete_general",
  },
};

export default {
  ...PERMISSONS,
};
