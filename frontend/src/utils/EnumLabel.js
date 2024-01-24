import {ServiceTypeLabels, ServiceType} from "../enum/service-type.enum";

export function serviceTypeParser(selectedValue) {
    if (Object.values(ServiceType).includes(selectedValue)) {
      const type = ServiceType[selectedValue];
      const serviceTypeLabels = ServiceTypeLabels[type];
      return serviceTypeLabels;
    } else {
      console.error("Invalid service type selected");
    }
}