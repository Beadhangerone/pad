class PressetController < ApplicationController
	before_action :check_presset


	def show
		@presset = Presset.where(name: params[:name]).take
	end



	# $keys = {
	# 	'q' => 81,
	# 	'w' => 87,
	# 	'e' => 69,
	# }

	# def sails
	# 	@audios = {
	# 		77 => './sounds/sails/kick.wav',
	# 		# 75 => './sounds/sails/hat.wav',
	# 		79 => './sounds/sails/snare.wav',
	# 		78 => './sounds/sails/piano1.wav',
	# 		72 => './sounds/sails/piano2.wav',
	# 		66 => './sounds/sails/riff1.wav',
	# 		71 => './sounds/sails/riff2.wav',		
	# 		86 => './sounds/sails/pad1.wav',
	# 		70 => './sounds/sails/pad2.wav',
	# 		82 => './sounds/sails/pad3.wav',
	# 		67 => './sounds/sails/pad4.wav',
	# 		68 => './sounds/sails/pad5.wav',
	# 		69 => './sounds/sails/pad6.wav',
	# 	}
	# end

	# def memory
	# 	@audios = {
	# 		77 => './sounds/memory/kick.wav',
	# 		75 => './sounds/memory/hat.wav',
	# 		79 => './sounds/memory/snare.wav',
	# 		72 => './sounds/memory/fx2.wav',
	# 		78 => './sounds/memory/fx1.wav',
	# 		66 => './sounds/memory/pad1.wav',
	# 		71 => './sounds/memory/pad2.wav',
	# 		84 => './sounds/memory/pad3.wav',
	# 		86 => './sounds/memory/wab1.wav',
	# 		70 => './sounds/memory/wab2.wav',
	# 		82 => './sounds/memory/wab3.wav',
	# 		69 => './sounds/memory/wab4.wav',
	# 	}
	# end

	private

	def check_presset
		presset = params[:presset]
		redirect_to presset_show_path(presset) if presset
	end

end
