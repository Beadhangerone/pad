class PressetController < ApplicationController
	before_action :check_presset
	def home
				
	end

	def sails
		@audios = {
			66 => './sounds/pad1.wav',
			69 => './sounds/wab4.wav',
			70 => './sounds/wab2.wav',
			71 => './sounds/pad2.wav',
			72 => './sounds/fx2.wav',
			75 => './sounds/hat.wav',
			77 => './sounds/kick.wav',
			78 => './sounds/fx1.wav',
			79 => './sounds/snare.wav',
			82 => './sounds/wab3.wav',
			84 => './sounds/pad3.wav',
			86 => './sounds/wab1.wav',
		}
	end

	def memory
		@audios = {
			66 => './sounds/pad1.wav',
			69 => './sounds/wab4.wav',
			70 => './sounds/wab2.wav',
			71 => './sounds/pad2.wav',
			72 => './sounds/fx2.wav',
			75 => './sounds/hat.wav',
			77 => './sounds/kick.wav',
			78 => './sounds/fx1.wav',
			79 => './sounds/snare.wav',
			82 => './sounds/wab3.wav',
			84 => './sounds/pad3.wav',
			86 => './sounds/wab1.wav',
		}
	end

	private

	def check_presset
		presset = params[:presset]
		redirect_to action: "#{presset}" if presset
	end

end
