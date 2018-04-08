require 'csv'
require 'json'

output = {
  type: "Feature",
  features: []
}

CSV.foreach('today.csv', headers: true) do |row|
  output[:features].push({
    "type" => "Feature",
    "geometry" => {
      "type" => "Point",
      "coordinates" => [
        row["Coordinates"] ? row["Coordinates"].split(', ')[0].to_f : nil,
        row["Coordinates"] ? row["Coordinates"].split(', ')[1].to_f : nil,
      ]
    },
    "properties" => {
      "description" => row["Performer"],
      "title" => row["Venue"],
      "marker-size" => "small"
    }
  })
end

File.open('output.json', 'w') { |f| f.write(JSON.generate(output)) }