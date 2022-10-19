"use strict";
const { findIndexToInsert } = require('./utils')

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  let logEntries = []
  let logEntry = {}
  // Save time in milliseconds
  let maxDateLogged = 0
  let minDateLogged = 0

  logSources.forEach((logSource) => {
    logEntry = logSource.pop()
    while (logEntry) {
      // This mean is not the first logSource
      if (maxDateLogged && minDateLogged) {
        const logEntryDate = new Date(logEntry.date).getTime()
        // If the first log entry of the new logSource is grater than the maxDateLogged of the last logSource
        // It will always push the logEntry at the end because log entries are ordered chronological
        if (logEntryDate > maxDateLogged) {
          logEntries.push(logEntry)
          maxDateLogged = logEntryDate
          logEntry = logSource.pop()
          continue
        }

        if (logEntryDate < minDateLogged) {
          logEntries.unshift(logEntry)
          minDateLogged = logEntryDate
          logEntry = logSource.pop()
          continue
        }

        const indexToSaveLogEntry = findIndexToInsert(logEntryDate, logEntries).index
        logEntries.splice(indexToSaveLogEntry, 0, logEntry)
        logEntry = logSource.pop()
      } else {
        logEntries.push(logEntry)
        logEntry = logSource.pop()
        continue
      }
    }
    maxDateLogged = new Date(logEntries.at(-1).date).getTime()
    minDateLogged = new Date(logEntries.at(0).date).getTime()
  });

  // Print log entries
  logEntries.forEach(log => {
    printer.print(log)
  })
  printer.done()
  return console.log("Sync sort complete.");
};

