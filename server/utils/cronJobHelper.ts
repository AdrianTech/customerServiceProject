import moment from "moment-timezone";
export const hTMLEmailHelper = (data: any) => {
  return Object.keys(data).reduce((all: any, option) => {
    const header = `<h3 style="font-family: Tahoma;">${option}</h3>`;
    const itemsList = data[option].map((user: any) => `<span style="font-family: Tahoma; font-size: 16px; color: #420501">${content(user)}</span>`).join("");
    function content(obj: any) {
      return `
      <h4 style="color: #010459; font-size: 18px;">${obj.fullname}</h4>
      ${obj.typeOfService.map((srv: any) => `<span>${srv.name} ${moment(srv.finishTime).format("LLL")}</span><br>`)}
      `;
    }
    return `${all}${header}${itemsList}`;
  }, "");
};
