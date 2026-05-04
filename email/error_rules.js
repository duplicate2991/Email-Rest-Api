const errorHandlers = [
  {
    name: "AUTH_FAILED",
    match: (err) =>
      err.code === "EAUTH" || err.response?.includes("535"),
    function: "useNextTransporter",
    response: {
      error: "AUTH_FAILED",
      message: "Email authentication failed",
    },
  },

  {
    name: "CONNECTION_FAILED",
    match: (err) =>
      err.code === "ECONNECTION" || err.code === "ETIMEDOUT",
    function: "useNextTransporter",
    response: {
      error: "CONNECTION_FAILED",
      message: "Mail server connection failed",
    },
  },

  {
    name: "INVALID_RECIPIENT",
    match: (err) =>
      err.code === "EENVELOPE" && err.response?.includes("550"),
    response: {
      error: "INVALID_RECIPIENT",
      message: "Invalid recipient email",
    },
  },

  {
    name: "RATE_LIMIT",
    match: (err) =>
      err.response?.toLowerCase().includes("limit") ||
      err.response?.toLowerCase().includes("too many"),
    function: "useNextTransporter",
    response: {
      error: "RATE_LIMIT",
      message: "Too many emails sent, try later",
    },
  },

  {
    name: "MESSAGE_REJECTED",
    match: (err) =>
      err.code === "EMESSAGE" || err.response?.includes("554"),
    response: {
      error: "MESSAGE_REJECTED",
      message: "Message rejected (spam suspected)",
    },
  },

  {
    name: "ATTACHMENT_ERROR",
    match: (err) => err.code === "ENOENT",
    response: {
      error: "ATTACHMENT_ERROR",
      message: "Attachment file not found",
    },
  },
];

module.export = errorHandlers;
