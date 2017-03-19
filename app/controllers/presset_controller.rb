class PressetController < ApplicationController
	before_action :check_presset

	$keys = {
		81 => 'q', 87 => 'w', 69 => 'e', 82 => 'r', 84 => 't', 89 => 'y', 85 => 'u', 73 => 'i', 79 => 'o', 80 => 'p',
		65 => 'a', 83 => 's', 68 => 'd', 70 => 'f', 71 => 'g', 72 => 'h', 74 => 'j', 75 => 'k', 76 => 'l',
		90 => 'z', 88 => 'x', 67 => 'c', 86 => 'v', 66 => 'b', 78 => 'n', 77 => 'm',
	}

	def show
		@presset = Presset.where(name: params[:name]).take
		@audios = {}
		@presset.sounds.each do |sound|
			@audios[sound.key] = sound.source
		end
	end

	private

	def check_presset
		presset = params[:presset]
		redirect_to presset_show_path(presset) if presset
	end

end
