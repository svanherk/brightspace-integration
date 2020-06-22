#!/bin/bash

# Static header fields.
time_start=$(date +%s)
echo "$time_start"

time_end=$(($time_start+600))
echo "$time_end"

payload='{
	"iss": "69373"
	"iat": "'${time_start}'"
	"exp": "'${time_end}'"
}'




echo "$payload"
