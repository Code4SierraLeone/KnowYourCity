package base

import (
	"io"
	"log"
	"os"
)

var (
	// Debug for debug logs
	Debug *log.Logger
	// Info for info logs
	Info *log.Logger
	// Warning for warning logs
	Warning *log.Logger
	// Error for Fatal error logs
	Error *log.Logger
)

// Init initializes loggers
func Init(file *os.File) {
	Debug = log.New(os.Stdout, "DEBUG: ", log.Ldate|log.Ltime|log.Llongfile)
	Info = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	Warning = log.New(os.Stdout, "WARNING: ", log.Ldate|log.Ltime|log.Lshortfile)
	Error = log.New(io.MultiWriter(file, os.Stderr), "FATAL: ", log.Ldate|log.Ltime|log.Lshortfile)
}
