export type Severity = 'success' | 'info' | 'warning' | 'error';

type Alert = {
  severity: Severity;
  message: string;
  id: string;
};

function uuid() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export let alerts: Alert[] = $state([]);

export function addAlert(severity: Severity, message: string) {
  alerts.push({ severity, message, id: uuid() });
}

export function info(message: string) {
  addAlert('info', message);
}

export function warn(message: string) {
  addAlert('warning', message);
}

export function error(message: string) {
  addAlert('error', message);
}

export function success(message: string) {
  addAlert('success', message);
}

export function removeAlert(alert: Alert) {
  alerts.splice(alerts.indexOf(alert), 1);
}
