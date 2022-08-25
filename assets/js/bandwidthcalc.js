function docalc()
{
  document.temps.WAN_bandwidth.value = (((document.temps.data_volume.value*10) / document.temps.compression_ratio.value) / (document.temps.time_window.value * 3600))
  document.temps.session_throughput.value = ((((document.temps.window_size.value*1024) / (document.temps.latency.value * 0.001)) * 8 * 0.000001))
  document.temps.sessions.value = Math.ceil(document.temps.WAN_bandwidth.value / document.temps.session_throughput.value)	
}
