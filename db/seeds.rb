# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
sails_s = {
	77 => '/sounds/sails/kick.wav',
	79 => '/sounds/sails/snare.wav',
	78 => '/sounds/sails/piano1.wav',
	72 => '/sounds/sails/piano2.wav',
	66 => '/sounds/sails/riff1.wav',
	71 => '/sounds/sails/riff2.wav',		
	86 => '/sounds/sails/pad1.wav',
	70 => '/sounds/sails/pad2.wav',
	82 => '/sounds/sails/pad3.wav',
	67 => '/sounds/sails/pad4.wav',
	68 => '/sounds/sails/pad5.wav',
	69 => '/sounds/sails/pad6.wav',
}
memory_s = {
	77 => '/sounds/memory/kick.wav',
	75 => '/sounds/memory/hat.wav',
	79 => '/sounds/memory/snare.wav',
	72 => '/sounds/memory/fx2.wav',
	78 => '/sounds/memory/fx1.wav',
	66 => '/sounds/memory/pad1.wav',
	71 => '/sounds/memory/pad2.wav',
	84 => '/sounds/memory/pad3.wav',
	86 => '/sounds/memory/wab1.wav',
	70 => '/sounds/memory/wab2.wav',
	82 => '/sounds/memory/wab3.wav',
	69 => '/sounds/memory/wab4.wav',
}

pressets = Presset.create([{name: 'sails'}, {name: 'memory'}])

sails_s.each do |key, value|
	pressets[0].sounds.create({key: key, source: value})
end

memory_s.each do |key, value|
	pressets[1].sounds.create({key: key, source: value})
end