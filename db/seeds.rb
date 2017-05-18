# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
def wi(char)
	wiches = {
	'q'=>81,'w'=>87,'e'=>69,'r'=>82,'t'=>84,'y'=>89,'u'=>85,'i'=>73,'o'=>79,'p'=>80,
	'a'=>65,'s'=>83,'d'=>68,'f'=>70,'g'=>71,'h'=>72,'j'=>74,'k'=>75,'l'=>76,
	'z'=>90,'x'=>88,'c'=>67,'v'=>86,'b'=>66,'n'=>78,'m'=>77}
		return wiches[char]
end
pressets = {
	'sails' => {
		wi('m') => '/sounds/sails/kick.wav',
		wi('o') => '/sounds/sails/snare.wav',
		wi('v') => '/sounds/sails/piano1.wav',
		wi('f') => '/sounds/sails/piano2.wav',
		wi('c') => '/sounds/sails/riff1.wav',
		wi('d') => '/sounds/sails/riff2.wav',
		wi('x') => '/sounds/sails/pad1.wav',
		wi('s') => '/sounds/sails/pad2.wav',
		wi('w') => '/sounds/sails/pad3.wav',
		wi('z') => '/sounds/sails/pad4.wav',
		wi('a') => '/sounds/sails/pad5.wav',
		wi('q') => '/sounds/sails/pad6.wav',
	},
	'memory' => {
		wi('m') => '/sounds/memory/kick.wav',
		wi('k') => '/sounds/memory/hat.wav',
		wi('o') => '/sounds/memory/snare.wav',
		wi('f') => '/sounds/memory/fx2.wav',
		wi('v') => '/sounds/memory/fx1.wav',
		wi('c') => '/sounds/memory/pad1.wav',
		wi('d') => '/sounds/memory/pad2.wav',
		wi('e') => '/sounds/memory/pad3.wav',
		wi('z') => '/sounds/memory/wab1.wav',
		wi('x') => '/sounds/memory/wab2.wav',
		wi('s') => '/sounds/memory/wab3.wav',
		wi('w') => '/sounds/memory/wab4.wav',
	},
	'alcatraz' => {
		wi('m') => '/sounds/alcatraz/kick.wav',
		wi('k') => '/sounds/alcatraz/hat.wav',
		wi('o') => '/sounds/alcatraz/snare.wav',
		wi('v') => '/sounds/alcatraz/guitar2.wav',
		wi('f') => '/sounds/alcatraz/guitar1.wav',
		wi('c') => '/sounds/alcatraz/pad1.wav',
		wi('d') => '/sounds/alcatraz/pad2.wav',
		wi('e') => '/sounds/alcatraz/pad3.wav',
		wi('x') => '/sounds/alcatraz/piano1.wav',
		wi('s') => '/sounds/alcatraz/piano2.wav',
		wi('z') => '/sounds/alcatraz/riff1.wav',
		wi('a') => '/sounds/alcatraz/riff2.wav',
	},
	'wox' => {
		wi('m') => '/sounds/wox/kick.wav',
		wi('k') => '/sounds/wox/hat.wav',
		wi('o') => '/sounds/wox/snare.wav',
		wi('j') => '/sounds/wox/crash.wav',
		wi('v') => '/sounds/wox/vox_I.wav',
		wi('f') => '/sounds/wox/vox_bird.wav',
		wi('c') => '/sounds/wox/pad1.wav',
		wi('d') => '/sounds/wox/pad2.wav',
		wi('e') => '/sounds/wox/pad3.wav',
		# wi('') => '/sounds/wox/piano2.wav',
		wi('x') => '/sounds/wox/riff.wav',
		# wi('') => '/sounds/wox/riff2.wav',
	},
	'808' => {
		wi('m') => '/sounds/808/Kick.wav',
		wi('j') => '/sounds/808/Swing.wav',
		wi('o') => '/sounds/808/Snare.wav',
		wi('k') => '/sounds/808/Scratch.wav',
		wi('c') => '/sounds/808/808_1.wav',
		wi('d') => '/sounds/808/808_2.wav',
		wi('e') => '/sounds/808/808_3.wav',
		wi('v') => '/sounds/808/transition.wav',
	},

}

pressets.each do |name, assets|
	presset = Presset.create(name: name)
	assets.each do |wich, s_path|
		name = s_path.split('/').pop.split('.')[0]
		presset.sounds.create({key: wich, source: s_path, name:name})
	end
end
