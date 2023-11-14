export const groupByStatus = (tickets) => {
  const statusGroups = {
    Backlog: [],
    Todo: [],
    "In Progress": [],
    Done: [],
    Cancelled: []
  };
  tickets.forEach((ticket) => {
    const status = statusGroups.hasOwnProperty(ticket.status)
      ? ticket.status
      : "Backlog";
    statusGroups[status].push(ticket);
  });
  return statusGroups;
};

export const groupByPriority = (tickets) => {
  const priorityGroups = {
    Urgent: [],
    High: [],
    Medium: [],
    Low: [],
    "No priority": []
  };
  tickets.forEach((ticket) => {
    switch (ticket.priority) {
      case 4:
        priorityGroups["Urgent"].push(ticket);
        break;
      case 3:
        priorityGroups["High"].push(ticket);
        break;
      case 2:
        priorityGroups["Medium"].push(ticket);
        break;
      case 1:
        priorityGroups["Low"].push(ticket);
        break;
      case 0:
      default:
        priorityGroups["No priority"].push(ticket);
    }
  });
  return priorityGroups;
};

export const groupByUser = (tickets, users) => {
  const userNameMap = users.reduce((acc, user) => {
    acc[user.id] = user.name;
    return acc;
  }, {});

  const userGroups = tickets.reduce((acc, ticket) => {
    const userName = userNameMap[ticket.userId];
    if (userName) {
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(ticket);
    } else {
      const unassignedGroup = "Unassigned";
      if (!acc[unassignedGroup]) {
        acc[unassignedGroup] = [];
      }
      acc[unassignedGroup].push(ticket);
    }
    return acc;
  }, {});

  return userGroups;
};
