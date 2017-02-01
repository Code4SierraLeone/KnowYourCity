package base

import (
	"time"
)

//Time Format ANSIC
//TimeZone Africa/SierraLeone

func GetTimeZone() (*time.Location, error) {
	return time.LoadLocation("Africa/SierraLeone")
}

func SetTimeZone(t time.Time, tz *time.Location) time.Time {
	return t.In(tz)
}

func GetDifference(t1 time.Time, t2 time.Time) float64 {
	duration := t1.Sub(t2)
	return duration.Hours()
}

func LessThan(t1 time.Time, t2 time.Time) bool {
	return !t1.After(t2)
}

func GreaterThan(t1 time.Time, t2 time.Time) bool {
	return t1.After(t2)
}

func AddHours(t time.Time, num float64) time.Time {
	return t.Add(time.Duration(num) * time.Hour)
}

func SubHours(t time.Time, num float64) time.Time {
	return t.Add(-time.Duration(num) * time.Hour)
}

func AddTime(t1 time.Time, t2 time.Time) time.Time {
	duration := t1.Sub(t2)
	return t1.Add(-(duration * time.Hour))
}

func SubTime(t1 time.Time, t2 time.Time) time.Time {
	duration := t1.Sub(t2)
	return t1.Add(-(duration * time.Hour))
}

func FormatTime(t time.Time) string {
	return t.Format(time.ANSIC)
}
