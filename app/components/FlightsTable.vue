<template>
    <table>
        <thead>
            <tr>
                <th>icao24</th>
                <th>callsign</th>
                <th>origin_country</th>
                <th>time_position</th>
                <th>last_contact</th>
                <th>longitude</th>
                <th>latitude</th>
                <th>baro_altitude</th>
                <th>on_ground</th>
                <th>velocity(m/s)</th>
                <th>true_track</th>
                <th>vertical_rate</th>
                <th>sensors</th>
                <th>geo_altitude</th>
                <th>squawk</th>
                <th>spi</th>
                <th>position_source</th>
            </tr>
        </thead>
        <tbody v-for="flight in flights" :key="flight[0]">
            <tr>            
                <td>{{ flight[0] }}</td>
                <td>{{ flight[1] }}</td>
                <td>{{ flight[2] }}</td>
                <td>{{ flight[3] }}</td>
                <td>{{ flight[4] }}</td>
                <td>{{ flight[5] }}</td>
                <td>{{ flight[6] }}</td>
                <td>{{ flight[7] }}</td>
                <td>{{ flight[8] }}</td>
                <td>{{ flight[9] }}</td>
                <td>{{ flight[10] }}</td>
                <td>{{ flight[11] }}</td>
                <td>{{ flight[12] }}</td>
                <td>{{ flight[13] }}</td>
                <td>{{ flight[14] }}</td>
                <td>{{ flight[15] }}</td>
                <td>{{ flight[16] }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default ({
    props: ['flights']
})
</script>
