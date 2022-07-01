---
title: Bandwidth Calc
layout: page
---
##Bandwidth calculator

<script type="text/javascript">
<!--
function docalc()
{
  document.temps.WAN_bandwidth.value = (((document.temps.data_volume.value*10) / document.temps.compression_ratio.value) / (document.temps.time_window.value * 3600))
  document.temps.session_throughput.value = ((((document.temps.window_size.value*1024) / (document.temps.latency.value * 0.001)) * 8 * 0.000001))
  document.temps.sessions.value = Math.ceil(document.temps.WAN_bandwidth.value / document.temps.session_throughput.value)	
}

//-->
</script>

<table width="100%" cellpadding="4" cellspacing="0" border="0" align="center">
<tr>
<td>
<form name="temps" action="">
<table align="center">
  <tr>
      <td valign="top">Data volume (MB)</td>
	  <td valign="top"<input type="text" name="data_volume" onchange="docalc()" style="width:150px" value="1" maxlength="10" size="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Time Window (hours)</td>
	  <td valign="top"<input type="text" name="time_window" onchange="docalc()" style="width:150px" value="10" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">Compression Ratio</td>
	  <td valign="top"<input type="text" name="compression_ratio" onchange="docalc()" style="width:150px" value="1" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top"<?php echo 'WAN Bandwidth (Mbps)'; ?></td>
	  <td valign="top"<input type="text" name="WAN_bandwidth" onchange="docalc()" style="width:150px" value="0" size="10" maxlength="10" readonly="readonly" />	</td>
	</tr>
	<tr>
	  <td valign="top">Latency (ms)></td>
	  <td valign="top"<input type="text" name="latency" onchange="docalc()" style="width:150px" value="40" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">TCP window size (KB)</td>
	  <td valign="top"<input type="text" name="window_size" onchange="docalc()" style="width:150px" value="65" size="10" maxlength="10" />	</td>
	</tr>
	<tr>
	  <td valign="top">TCP session throughput (Mbps)</td>
	  <td valign="top"<input type="text" name="session_throughput" onchange="docalc()" style="width:150px" value="0" size="10" maxlength="10" readonly="readonly" />	</td>
	</tr>
	<tr>
	  <td valign="top">TCP Sessions required</td>
	  <td valign="top"<input type="text" name="sessions" onchange="docalc()" style="width:150px" value="0" size="10" maxlength="10" readonly="readonly" />	</td>
	</tr>
</table>
</form>
<table align="center">
	<tr>
	  <td
      <?php echo '<br /><b>Bandwidth requirements calculation</b><br />
In order to estimate the bandwidth needed the following calculation was used:<br />
<br />
T = (d / t) * (8 bits/Byte + 2 bits/Byte overhead) * (1 hour / 3600)<br />
<br />
T = Sustained WAN Bandwidth required to transfer data in Mbps<br />
d = Amount of data to be transferred in Mbytes<br />
t = Maximum amount of time allotted for transfer in hours<br />
<br />
When I convert bits to bytes, I use 10 bits per byte instead of 8, to account for some packet overhead in transmittion.<br />
A 1500 byte ethernet frame has 40 bytes of TCP/IP and ethernet headers, so I was trying to account for that.<br />
This would account for some of the IP header overhead.   Not completely scientific but better.<br /> 
<br />
<b>TCP Throughput calculation</b><br />
In order to estimate the throughput, of a single TCP flow or session, the following calculation was used:<br />
<br />
T = (w / l)<br />
<br />
T = Maximum TCP session throughput in Bps<br />
w = TCP stack window size in bytes<br />
l = Roundtrip network latency in seconds<br />'; ?>
	  </td>
	</tr>
</table>
</td>
</tr>
</table>
